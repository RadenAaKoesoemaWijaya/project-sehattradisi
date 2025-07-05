import * as tf from '@tensorflow/tfjs';
import { ServiceType } from '../types';

interface UserBehavior {
  userId: string;
  viewedServices: string[];
  bookings: string[];
  favorites: string[];
  categories: { [key: string]: number };
  priceRange: { min: number; max: number };
  locations: string[];
  timePreferences: string[];
}

export class RecommendationService {
  private static instance: RecommendationService;
  private userBehaviors: Map<string, UserBehavior> = new Map();
  private model: tf.LayersModel | null = null;

  private constructor() {
    this.initModel();
  }

  public static getInstance(): RecommendationService {
    if (!RecommendationService.instance) {
      RecommendationService.instance = new RecommendationService();
    }
    return RecommendationService.instance;
  }

  private async initModel() {
    // Simple collaborative filtering model
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 32, activation: 'relu', inputShape: [10] }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 8, activation: 'softmax' })
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  public trackServiceView(userId: string, serviceId: string) {
    const behavior = this.getUserBehavior(userId);
    if (!behavior.viewedServices.includes(serviceId)) {
      behavior.viewedServices.push(serviceId);
    }
    this.userBehaviors.set(userId, behavior);
  }

  public trackBooking(userId: string, serviceId: string, category: string) {
    const behavior = this.getUserBehavior(userId);
    behavior.bookings.push(serviceId);
    behavior.categories[category] = (behavior.categories[category] || 0) + 1;
    this.userBehaviors.set(userId, behavior);
  }

  public trackFavorite(userId: string, serviceId: string) {
    const behavior = this.getUserBehavior(userId);
    if (!behavior.favorites.includes(serviceId)) {
      behavior.favorites.push(serviceId);
    }
    this.userBehaviors.set(userId, behavior);
  }

  private getUserBehavior(userId: string): UserBehavior {
    if (!this.userBehaviors.has(userId)) {
      this.userBehaviors.set(userId, {
        userId,
        viewedServices: [],
        bookings: [],
        favorites: [],
        categories: {},
        priceRange: { min: 0, max: 500000 },
        locations: [],
        timePreferences: []
      });
    }
    return this.userBehaviors.get(userId)!;
  }

  public getPersonalizedRecommendations(
    userId: string,
    services: ServiceType[],
    limit: number = 6
  ): ServiceType[] {
    const behavior = this.getUserBehavior(userId);
    
    // Simple scoring based on user behavior
    const scoredServices = services.map(service => {
      let score = 0;
      
      // Category preference
      const categoryScore = behavior.categories[service.category] || 0;
      score += categoryScore * 2;
      
      // Previously viewed
      if (behavior.viewedServices.includes(service.id)) {
        score += 1;
      }
      
      // Previously booked
      if (behavior.bookings.includes(service.id)) {
        score += 3;
      }
      
      // Favorited
      if (behavior.favorites.includes(service.id)) {
        score += 2;
      }
      
      // Price range preference
      if (
        service.price >= behavior.priceRange.min &&
        service.price <= behavior.priceRange.max
      ) {
        score += 1;
      }
      
      // Rating influence
      score += service.rating;
      
      return { service, score };
    });
    
    // Sort by score and return top N recommendations
    return scoredServices
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.service);
  }

  public getPackageRecommendations(
    userId: string,
    services: ServiceType[]
  ): { name: string; services: ServiceType[]; totalPrice: number }[] {
    const behavior = this.getUserBehavior(userId);
    const recommendations = this.getPersonalizedRecommendations(userId, services);
    
    // Create packages based on user preferences and complementary services
    const packages = [
      {
        name: 'Paket Relaksasi Lengkap',
        services: recommendations.filter(
          service => service.category === 'massage' || service.category === 'spa'
        ).slice(0, 2),
      },
      {
        name: 'Paket Kesehatan Tradisional',
        services: recommendations.filter(
          service => service.category === 'herbal' || service.category === 'massage'
        ).slice(0, 2),
      },
      {
        name: 'Paket Spa Premium',
        services: recommendations.filter(
          service => service.category === 'spa'
        ).slice(0, 3),
      }
    ];
    
    return packages.map(pkg => ({
      ...pkg,
      totalPrice: pkg.services.reduce((sum, service) => sum + service.price, 0)
    }));
  }
}

export const recommendationService = RecommendationService.getInstance();