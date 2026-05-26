'use client';

import React, { use } from 'react';
import ProjectDetailTemplate from '@/components/ProjectDetailTemplate';

/**
 * Dynamic CMS project page — /projects/[id]
 *
 * This page passes the slug down to ProjectDetailTemplate which
 * has a built-in useEffect that fetches the full project document
 * from Firestore's `projects` collection using the URL path.
 *
 * All real data (title, heroImage, description, houseTypes, etc.)
 * comes from Firestore via the CMS — never hardcoded here.
 */
export default function Page({ params }) {
  // Unwrap params using React.use() as required by Next.js App Router
  const { id } = use(params);

  return (
    <ProjectDetailTemplate
      title="Loading Estate..."
      heroImage={null}
      heroVideo={null}
      heroPoster={null}
      heroDescription=""
      description=""
      highlights={[]}
      realEstateVibe={[]}
      nearbyFacilities={[]}
      marketSnapshot={[]}
      plotSizes={[]}
      houseTypes={[]}
      houseTypesTitle=""
      sidebarAdviser={null}
      otherNeighborhoods={[]}
      mapEmbedUrl={null}
      updatesLink={null}
      projectId={id}
    />
  );
}
