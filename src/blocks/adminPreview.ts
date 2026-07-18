import type { Block } from 'payload'

type Preview = {
  label: string
  body: string
}

const previews: Record<string, Preview> = {
  cta: { label: 'CALL TO ACTION', body: '<rect x="28" y="34" width="152" height="15" rx="3" fill="#f8f4ec"/><rect x="28" y="58" width="104" height="7" rx="3" fill="#b8b0a5"/><rect x="28" y="91" width="64" height="20" rx="10" fill="#f37b35"/><rect x="101" y="91" width="64" height="20" rx="10" fill="#4e7459"/>' },
  eventBanner: { label: 'EVENT BANNER', body: '<path d="M0 25h240v43H0z" fill="#f37b35"/><circle cx="43" cy="46" r="13" fill="#1c1b1a"/><rect x="67" y="36" width="101" height="9" rx="3" fill="#1c1b1a"/><rect x="67" y="52" width="62" height="6" rx="3" fill="#75351a"/><path d="M197 37l18 9-18 9z" fill="#1c1b1a"/>' },
  crewList: { label: 'CREW LIST', body: '<rect x="28" y="32" width="84" height="11" rx="3" fill="#f8f4ec"/><g fill="#d4a76c"><circle cx="54" cy="80" r="19"/><circle cx="120" cy="80" r="19"/><circle cx="186" cy="80" r="19"/></g><g fill="#f8f4ec"><rect x="34" y="105" width="40" height="6" rx="3"/><rect x="100" y="105" width="40" height="6" rx="3"/><rect x="166" y="105" width="40" height="6" rx="3"/></g>' },
  recommendations: { label: 'RECOMMENDATIONS', body: '<rect x="28" y="31" width="121" height="11" rx="3" fill="#f8f4ec"/><g fill="#486b54"><rect x="28" y="58" width="55" height="55" rx="5"/><rect x="93" y="58" width="55" height="55" rx="5"/><rect x="158" y="58" width="55" height="55" rx="5"/></g><g fill="#e7dbcc"><circle cx="55" cy="82" r="12"/><circle cx="120" cy="82" r="12"/><circle cx="185" cy="82" r="12"/></g>' },
  content: { label: 'CONTENT', body: '<rect x="28" y="29" width="112" height="11" rx="3" fill="#f8f4ec"/><rect x="28" y="52" width="179" height="6" rx="3" fill="#b8b0a5"/><rect x="28" y="64" width="164" height="6" rx="3" fill="#b8b0a5"/><rect x="28" y="76" width="184" height="6" rx="3" fill="#b8b0a5"/><rect x="28" y="97" width="88" height="6" rx="3" fill="#b8b0a5"/>' },
  mediaBlock: { label: 'MEDIA', body: '<rect x="28" y="28" width="184" height="87" rx="5" fill="#5d7895"/><circle cx="94" cy="72" r="22" fill="#8bb1b8"/><path d="M28 105l48-39 35 26 30-20 71 33v10H28z" fill="#314554"/><path d="M112 60l19 12-19 12z" fill="#f8f4ec"/>' },
  archive: { label: 'ARCHIVE', body: '<rect x="28" y="29" width="92" height="11" rx="3" fill="#f8f4ec"/><g fill="#c9b8a3"><rect x="28" y="55" width="55" height="60" rx="4"/><rect x="93" y="55" width="55" height="60" rx="4"/><rect x="158" y="55" width="55" height="60" rx="4"/></g><g fill="#5e5147"><rect x="35" y="94" width="40" height="6" rx="2"/><rect x="100" y="94" width="40" height="6" rx="2"/><rect x="165" y="94" width="40" height="6" rx="2"/></g>' },
  formBlock: { label: 'FORM', body: '<rect x="28" y="29" width="72" height="11" rx="3" fill="#f8f4ec"/><g fill="#393735"><rect x="28" y="54" width="184" height="16" rx="3"/><rect x="28" y="78" width="184" height="16" rx="3"/></g><rect x="28" y="102" width="67" height="15" rx="7" fill="#f37b35"/>' },
  marquee: { label: 'MARQUEE', body: '<path d="M0 42h240v48H0z" fill="#f37b35"/><text x="17" y="72" fill="#1c1b1a" font-family="Arial, sans-serif" font-size="19" font-weight="700">FUZZLER • FUZZLER •</text>' },
  features: { label: 'FEATURES', body: '<rect x="28" y="29" width="102" height="11" rx="3" fill="#f8f4ec"/><g><rect x="28" y="55" width="55" height="61" rx="4" fill="#725b90"/><rect x="93" y="55" width="55" height="61" rx="4" fill="#a06f4e"/><rect x="158" y="55" width="55" height="61" rx="4" fill="#4e7459"/></g><g fill="#f8f4ec"><circle cx="44" cy="72" r="7"/><circle cx="109" cy="72" r="7"/><circle cx="174" cy="72" r="7"/><rect x="37" y="91" width="34" height="5" rx="2"/><rect x="102" y="91" width="34" height="5" rx="2"/><rect x="167" y="91" width="34" height="5" rx="2"/></g>' },
  pricing: { label: 'PRICING', body: '<rect x="28" y="29" width="81" height="11" rx="3" fill="#f8f4ec"/><g fill="#f2eee5"><rect x="28" y="53" width="55" height="66" rx="4"/><rect x="93" y="53" width="55" height="66" rx="4"/><rect x="158" y="53" width="55" height="66" rx="4"/></g><g fill="#383532"><rect x="38" y="66" width="35" height="6" rx="2"/><rect x="103" y="66" width="35" height="6" rx="2"/><rect x="168" y="66" width="35" height="6" rx="2"/></g><g fill="#f37b35"><rect x="38" y="101" width="35" height="9" rx="4"/><rect x="103" y="101" width="35" height="9" rx="4"/><rect x="168" y="101" width="35" height="9" rx="4"/></g>' },
  schedule: { label: 'SCHEDULE', body: '<rect x="28" y="29" width="91" height="11" rx="3" fill="#f8f4ec"/><path d="M55 54v64M102 54v64M156 54v64M211 54v64M28 70h184M28 92h184" stroke="#837d73" stroke-width="2"/><rect x="57" y="56" width="41" height="12" rx="2" fill="#f37b35"/><rect x="104" y="72" width="48" height="18" rx="2" fill="#725b90"/><rect x="158" y="94" width="50" height="16" rx="2" fill="#4e7459"/>' },
  countdown: { label: 'COUNTDOWN', body: '<rect x="28" y="29" width="105" height="11" rx="3" fill="#f8f4ec"/><g fill="#f2eee5"><rect x="28" y="57" width="38" height="43" rx="4"/><rect x="76" y="57" width="38" height="43" rx="4"/><rect x="124" y="57" width="38" height="43" rx="4"/><rect x="172" y="57" width="38" height="43" rx="4"/></g><text x="37" y="84" fill="#282624" font-family="Arial" font-size="17" font-weight="700">03</text><text x="85" y="84" fill="#282624" font-family="Arial" font-size="17" font-weight="700">12</text><text x="133" y="84" fill="#282624" font-family="Arial" font-size="17" font-weight="700">44</text><text x="181" y="84" fill="#282624" font-family="Arial" font-size="17" font-weight="700">09</text>' },
  dashboard: { label: 'DASHBOARD', body: '<rect x="28" y="29" width="105" height="11" rx="3" fill="#f8f4ec"/><rect x="28" y="55" width="107" height="59" rx="4" fill="#4c6c75"/><path d="M37 101l19-18 17 8 20-25 33 34" fill="none" stroke="#f2eee5" stroke-width="3"/><rect x="145" y="55" width="67" height="26" rx="4" fill="#f37b35"/><rect x="145" y="88" width="67" height="26" rx="4" fill="#725b90"/>' },
  faq: { label: 'FAQ', body: '<rect x="28" y="29" width="45" height="11" rx="3" fill="#f8f4ec"/><g fill="#393735"><rect x="28" y="55" width="184" height="17" rx="3"/><rect x="28" y="79" width="184" height="17" rx="3"/><rect x="28" y="103" width="184" height="17" rx="3"/></g><g fill="#f37b35"><circle cx="197" cy="63" r="5"/><circle cx="197" cy="87" r="5"/><circle cx="197" cy="111" r="5"/></g>' },
  social: { label: 'SOCIAL', body: '<rect x="28" y="29" width="69" height="11" rx="3" fill="#f8f4ec"/><g><circle cx="58" cy="80" r="21" fill="#725b90"/><circle cx="120" cy="80" r="21" fill="#f37b35"/><circle cx="182" cy="80" r="21" fill="#4e7459"/></g><text x="49" y="87" fill="#fff" font-family="Arial" font-size="18" font-weight="700">f</text><text x="112" y="87" fill="#fff" font-family="Arial" font-size="18" font-weight="700">@</text><text x="174" y="87" fill="#fff" font-family="Arial" font-size="18" font-weight="700">in</text>' },
  postsArchive: { label: 'POSTS ARCHIVE', body: '<rect x="28" y="29" width="119" height="11" rx="3" fill="#f8f4ec"/><g fill="#b48b62"><rect x="28" y="55" width="55" height="35" rx="4"/><rect x="93" y="55" width="55" height="35" rx="4"/><rect x="158" y="55" width="55" height="35" rx="4"/></g><g fill="#f8f4ec"><rect x="28" y="99" width="49" height="6" rx="2"/><rect x="93" y="99" width="49" height="6" rx="2"/><rect x="158" y="99" width="49" height="6" rx="2"/></g>' },
}

/** Adds an informative thumbnail to the Payload block picker without changing the block itself. */
export const withAdminPreview = (block: Block): Block => {
  const preview = previews[block.slug]
  if (!preview) return block

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140"><rect width="240" height="140" rx="8" fill="#242321"/><text x="28" y="20" fill="#a9a399" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="1.2">${preview.label}</text>${preview.body}</svg>`

  return {
    ...block,
    admin: {
      ...block.admin,
      images: {
        ...block.admin?.images,
        thumbnail: {
          alt: `Podgląd bloku: ${preview.label}`,
          url: `data:image/svg+xml,${encodeURIComponent(svg)}`,
        },
      },
    },
  }
}
