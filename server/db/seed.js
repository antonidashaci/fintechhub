const { query } = require('./index');
const bcrypt = require('bcrypt');

// Provider data from app.js
const providers = require('../../data/providers.json');

async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  try {
    // 1. Seed demo users
    console.log('Creating demo users...');
    const demoPassword = await bcrypt.hash('Fintech!2025', 10);
    
    await query(`
      INSERT INTO users (email, password_hash, name, company, role, email_verified)
      VALUES 
        ($1, $2, $3, $4, $5, true),
        ($6, $7, $8, $9, $10, true)
      ON CONFLICT (email) DO NOTHING
    `, [
      'demo@fintechhubturkiye.com', demoPassword, 'Demo Kullanıcısı', 'Fintech Hub Türkiye', 'user',
      'selin.kaya@fintechhubturkiye.com', await bcrypt.hash('Growth2025!', 10), 'Selin Kaya', 'Growth Lab', 'user'
    ]);

    // 2. Seed providers
    console.log('Seeding providers...');
    for (const provider of providers) {
      await query(`
        INSERT INTO providers (
          id, name, logo, type, categories, rating, reviews, featured, is_new,
          badges, card_description, modal_summary, features, differentiators,
          pricing, campaign, metrics, keywords, added_at, resources, contact,
          comparison, supports_commission_calculator
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
          $16, $17, $18, $19, $20, $21, $22, $23
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          rating = EXCLUDED.rating,
          reviews = EXCLUDED.reviews,
          updated_at = CURRENT_TIMESTAMP
      `, [
        provider.id,
        provider.name,
        provider.logo,
        provider.type,
        provider.categories,
        provider.rating,
        provider.reviews,
        provider.featured,
        provider.isNew,
        provider.badges,
        provider.cardDescription,
        provider.modalSummary,
        provider.features,
        provider.differentiators,
        JSON.stringify(provider.pricing),
        JSON.stringify(provider.campaign),
        JSON.stringify(provider.metrics),
        provider.keywords,
        provider.addedAt,
        JSON.stringify(provider.resources),
        JSON.stringify(provider.contact),
        JSON.stringify(provider.comparison),
        provider.supportsCommissionCalculator
      ]);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`   - ${providers.length} providers added`);
    console.log(`   - 2 demo users created`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seed complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase;

