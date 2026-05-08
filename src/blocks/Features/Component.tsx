import React from 'react'
import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'
import { FeatureCard } from '@/components/ui/feature-card'
import { SectionHeader } from '@/components/SectionHeader'

export const FeaturesBlockComponent: React.FC<FeaturesBlockProps & { disableInnerContainer?: boolean }> = (props) => {
  const { tagline, title, description, features, anchor } = props

  return (
    <div className="container py-24" id={anchor || undefined}>
      <SectionHeader tagline={tagline} title={title} description={description} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features?.map((feature, i) => (
          <FeatureCard
            key={i}
            index={i}
            title={feature.title}
            color={feature.color as any}
            footerLeft={feature.footerLeft || undefined}
            footerRight={feature.footerRight || undefined}
            iconName={feature.icon}
            href={feature.link || undefined}
          >
            {feature.description}
          </FeatureCard>
        ))}
      </div>
    </div>
  )
}
