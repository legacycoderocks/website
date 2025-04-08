import { patreon, jsonApiURL } from '@nathanhigh/patreon';

const campaignId = process.env.PATREON_CAMPAIGN_ID;

const campaignUrl = jsonApiURL(`/campaigns/${campaignId}`, { 
  fields: { 
    campaign: ['created_at', 'creation_name', 'patron_count'], 
    member: ['full_name', 'patron_status'], 
    tier: ['title', 'amount_cents'] 
  }, 
  include: ['tiers'] 
});

const membersUrl = jsonApiURL(`/campaigns/${campaignId}/members`, { 
  fields: { 
    campaign: ['created_at', 'creation_name', 'patron_count'], 
    member: ['full_name', 'patron_status'], 
    tier: ['title', 'amount_cents'] 
  }, 
  include: ['currently_entitled_tiers'] 
});

export async function getPatronsByTier() {
  const levels = await getMembershipLevels();
  const patrons = await getPatrons();

  const patronsByTier = new Map();
  for (const [tierId, tier] of levels) {
    patronsByTier.set(tierId, {
      title: tier.title,
      amount_cents: tier.amount_cents,
      patrons: []
    });
  }

  for (const [memberId, member] of patrons) {
    for (const tierId of member.tiers) {
      if (patronsByTier.has(tierId)) {
        patronsByTier.get(tierId).patrons.push({
          id: memberId,
          full_name: member.full_name,
          patron_status: member.patron_status
        });
      }
    }
  }

  return [...patronsByTier.values()];
}

export async function getPatrons() {
  const client = patreon(process.env.PATREON_CREATOR_ACCESS_TOKEN);
  const result = await client(membersUrl);

  const collectedMembers = Object
    .values(result.store.graph.member)
    .filter(item => item.patron_status == 'active_patron')
    .sort((left, right) => left.full_name.localeCompare(right.full_name))
    .map((item) => [
      item.id, 
      { 
        full_name: item.full_name, 
        patron_status: item.patron_status, 
        tiers: item.currently_entitled_tiers.map(tier => tier.id) 
      }
    ])

  return new Map(collectedMembers);
}

export async function getMembershipLevels() {
  const client = patreon(process.env.PATREON_CREATOR_ACCESS_TOKEN);
  const result = await client(campaignUrl);

  const collectedLevels = Object
    .values(result.store.graph.tier)
    .filter(item => item.amount_cents > 0)
    .sort((left, right) => left.amount_cents - right.amount_cents)
    .map((item) => [item.id, { title: item.title, amount_cents: item.amount_cents }]);

  return new Map(collectedLevels)
}
