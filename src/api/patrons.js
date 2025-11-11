const campaignId = process.env.PATREON_CAMPAIGN_ID;
const accessToken = process.env.PATREON_CREATOR_ACCESS_TOKEN;

// Build Patreon API URL with query parameters
function buildPatreonURL(path, options = {}) {
  const { fields = {}, include = [] } = options;
  const params = new URLSearchParams();

  // Add fields parameters
  for (const [resource, fieldList] of Object.entries(fields)) {
    if (fieldList.length > 0) {
      params.append(`fields[${resource}]`, fieldList.join(','));
    }
  }

  // Add include parameter
  if (include.length > 0) {
    params.append('include', include.join(','));
  }

  const queryString = params.toString();
  return `https://www.patreon.com/api/oauth2/v2${path}${queryString ? '?' + queryString + '&' : ''}`;
}

// Make authenticated request to Patreon API
async function patreonFetch(url) {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Patreon API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

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
  const url = buildPatreonURL(`/campaigns/${campaignId}/members`, {
    fields: {
      campaign: ['created_at', 'creation_name', 'patron_count'],
      member: ['full_name', 'patron_status'],
      tier: ['title', 'amount_cents']
    },
    include: ['currently_entitled_tiers']
  });

  const result = await patreonFetch(url);

  // Build a lookup map for included tiers
  const tierMap = new Map();
  if (result.included) {
    for (const item of result.included) {
      if (item.type === 'tier') {
        tierMap.set(item.id, item);
      }
    }
  }

  // Extract members from the response
  const members = result.data || [];

  const collectedMembers = members
    .filter(item => item.attributes.patron_status === 'active_patron')
    .sort((left, right) => left.attributes.full_name.localeCompare(right.attributes.full_name))
    .map((item) => {
      // Get tier IDs from relationships
      const tierIds = item.relationships?.currently_entitled_tiers?.data?.map(tier => tier.id) || [];

      return [
        item.id,
        {
          full_name: item.attributes.full_name,
          patron_status: item.attributes.patron_status,
          tiers: tierIds
        }
      ];
    });

  return new Map(collectedMembers);
}

export async function getMembershipLevels() {
  const url = buildPatreonURL(`/campaigns/${campaignId}`, {
    fields: {
      campaign: ['created_at', 'creation_name', 'patron_count'],
      member: ['full_name', 'patron_status'],
      tier: ['title', 'amount_cents']
    },
    include: ['tiers']
  });

  const result = await patreonFetch(url);

  // Extract tiers from included resources
  const tiers = result.included?.filter(item => item.type === 'tier') || [];

  const collectedLevels = tiers
    .filter(item => item.attributes.amount_cents > 0)
    .sort((left, right) => left.attributes.amount_cents - right.attributes.amount_cents)
    .map((item) => [
      item.id,
      {
        title: item.attributes.title,
        amount_cents: item.attributes.amount_cents
      }
    ]);

  return new Map(collectedLevels);
}
