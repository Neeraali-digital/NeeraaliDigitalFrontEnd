import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  cta: string;
}

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss'
})
export class ServiceDetail implements OnInit {
  serviceData: ServiceData | null = null;

  private servicesData: { [key: string]: ServiceData } = {
    'brand-identity': {
      title: 'Brand Identity',
      subtitle: 'Build, Optimize, and Scale Your Digital Presence',
      description: 'Your website is your brand\'s digital home — and we make it unforgettable. At Neeraali, we design and develop websites that are fast, functional, and visually striking. Whether you\'re launching a new brand, scaling your business, or refreshing your online identity, we craft user-first experiences optimized for performance, SEO, and conversions.',
      services: [
        'Website Design & Development – Custom, responsive, and conversion-focused websites.',
        'E-commerce Development – Secure, scalable platforms for seamless transactions.',
        'Hosting & Maintenance – Reliable hosting and ongoing site upkeep for optimal performance.',
        'Web Security – Advanced protection to safeguard your brand and customers.'
      ],
      cta: 'Transform your website into a powerful tool that drives results.'
    },
    'digital-marketing': {
      title: 'Digital Marketing',
      subtitle: 'Build, Optimize, and Scale Your Digital Presence',
      description: 'Your website is your brand\'s digital home — and we make it unforgettable. At Neeraali, we design and develop websites that are fast, functional, and visually striking. Whether you\'re launching a new brand, scaling your business, or refreshing your online identity, we craft user-first experiences optimized for performance, SEO, and conversions.',
      services: [
        'Website Design & Development – Custom, responsive, and conversion-focused websites.',
        'E-commerce Development – Secure, scalable platforms for seamless transactions.',
        'Hosting & Maintenance – Reliable hosting and ongoing site upkeep for optimal performance.',
        'Web Security – Advanced protection to safeguard your brand and customers.'
      ],
      cta: 'Transform your website into a powerful tool that drives results.'
    },
    'web-solutions': {
      title: 'Web Solutions',
      subtitle: 'Build, Optimize, and Scale Your Digital Presence',
      description: 'Your website is your brand\'s digital home — and we make it unforgettable. At Neeraali, we design and develop websites that are fast, functional, and visually striking. Whether you\'re launching a new brand, scaling your business, or refreshing your online identity, we craft user-first experiences optimized for performance, SEO, and conversions.',
      services: [
        'Website Design & Development – Custom, responsive, and conversion-focused websites.',
        'E-commerce Development – Secure, scalable platforms for seamless transactions.',
        'Hosting & Maintenance – Reliable hosting and ongoing site upkeep for optimal performance.',
        'Web Security – Advanced protection to safeguard your brand and customers.'
      ],
      cta: 'Transform your website into a powerful tool that drives results.'
    },
    'social-media-marketing': {
      title: 'Social Media Marketing',
      subtitle: 'Amplify Your Brand\'s Voice Online',
      description: 'Your audience lives online — we make sure they find you. Our social media experts create campaigns that spark conversations, build communities, and drive meaningful engagement. From content creation to paid advertising, we handle everything to ensure your brand doesn\'t just show up — it stands out.',
      services: [
        'Strategy & Management – End-to-end management of social platforms.',
        'Paid Social Campaigns – Targeted campaigns designed to maximize engagement and conversions.',
        'Community Building – Authentic engagement that converts followers into loyal fans.',
        'Analytics & Optimization – Data-driven improvements for ongoing growth.'
      ],
      cta: 'Elevate your social presence with campaigns that captivate and convert.'
    },
    'influencer-marketing': {
      title: 'Influencer Marketing',
      subtitle: 'Authentic Voices. Real Impact.',
      description: 'Influencers bridge the gap between brands and audiences — and we know how to do it right. Neeraali connects your brand with creators who resonate with your audience, ensuring authenticity, trust, and maximum engagement. From awareness to conversions, our influencer campaigns deliver measurable results.',
      services: [
        'Creator Identification & Collaboration',
        'Campaign Strategy & Management',
        'Performance Tracking & Reporting',
        'Cross-Platform Execution'
      ],
      cta: 'Let your brand be heard by the voices your audience trusts most.'
    },
    'creative-design': {
      title: 'Creative Design Services',
      subtitle: 'Design That Speaks. Strategy That Converts.',
      description: 'Great design tells your story even before a word is read. At Neeraali, we merge creativity with strategy to deliver visually stunning designs that captivate and convert. From logos to marketing materials, we craft designs that reflect your brand\'s essence and elevate your identity.',
      services: [
        'Logo & Brand Identity Design',
        'Marketing Collateral (Brochures, Flyers, Business Cards)',
        'Social Media Creatives',
        'Packaging & Print Design'
      ],
      cta: 'Turn your ideas into visuals that resonate, inspire, and engage.'
    },
    'performance-marketing': {
      title: 'Performance Marketing',
      subtitle: 'Data-Driven Campaigns. Real Results.',
      description: 'Marketing should deliver results — not just impressions. Our performance marketing team creates high-impact, data-driven campaigns that generate leads, boost conversions, and maximize ROI. Through precise targeting and continuous optimization, we turn clicks into customers and campaigns into business growth.',
      services: [
        'Search Engine Marketing (Google Ads, Bing Ads)',
        'Social Media Advertising',
        'Conversion Rate Optimization (CRO)',
        'Analytics & Reporting'
      ],
      cta: 'Grow your business with campaigns built to perform — not just impress.'
    },
    'video-production': {
      title: 'Video Production',
      subtitle: 'Stories That Move People',
      description: 'In a world of short attention spans, videos make brands unforgettable. From concept to post-production, we create cinematic videos that connect emotionally and deliver results. Whether it\'s a brand story, corporate video, or social ad, our team crafts narratives that captivate your audience and inspire action.',
      services: [
        'Brand Films & Corporate Videos',
        'Product & Explainer Videos',
        'Social Media Reels & Ads',
        'Motion Graphics & Animation'
      ],
      cta: 'Lights. Camera. Connection. Let\'s bring your story to life.'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const service = params['service'];
      this.serviceData = this.servicesData[service] || null;
      window.scrollTo(0, 0);
    });
  }

  openWhatsApp() {
    const phoneNumber = '919945883333';
    const message = 'Hi! I would like to discuss my brand growth with Neeraali Digital.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
