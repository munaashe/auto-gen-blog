const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author VARCHAR(100) DEFAULT 'AI Writer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const result = await client.query('SELECT COUNT(*) FROM articles');
    const count = parseInt(result.rows[0].count);

    if (count === 0) {
      console.log('Seeding initial articles...');
      const seedArticles = [
        {
          title: 'The Future of Web Development',
          content: `Web development has evolved dramatically over the past decade. From simple static HTML pages to complex single-page applications, the landscape continues to shift. Modern frameworks like React, Vue, and Angular have revolutionized how we build user interfaces, while backend technologies have embraced microservices and serverless architectures.

The rise of JAMstack (JavaScript, APIs, and Markup) has introduced a new paradigm for building fast, secure websites. By pre-rendering pages and serving them from CDNs, developers can achieve incredible performance while maintaining dynamic capabilities through APIs.

Looking ahead, we can expect even more innovation. WebAssembly promises near-native performance in the browser, edge computing brings servers closer to users, and AI-assisted coding tools are changing how we write code. The future is bright for web developers willing to continuously learn and adapt.`,
          excerpt: 'Exploring the evolution and future trends in modern web development.'
        },
        {
          title: 'Understanding Docker Containers',
          content: `Docker has transformed how we build, ship, and run applications. By containerizing applications, developers can ensure consistency across different environments, from local development to production servers.

A Docker container packages an application with all its dependencies, libraries, and configuration files. This isolation means that if it works on your machine, it will work anywhere Docker runs. This solves the classic "it works on my machine" problem that has plagued development teams for years.

Key benefits of Docker include improved resource utilization, faster deployment times, and easier scaling. With Docker Compose, you can define multi-container applications and orchestrate complex systems with simple YAML configuration files. For larger deployments, orchestration tools like Kubernetes take container management to the next level.

Whether you're building microservices, deploying legacy applications, or experimenting with new technologies, Docker provides a consistent, reliable platform that streamlines the development lifecycle.`,
          excerpt: 'A comprehensive guide to Docker and containerization technology.'
        },
        {
          title: 'PostgreSQL: The World\'s Most Advanced Open Source Database',
          content: `PostgreSQL has earned its reputation as one of the most powerful and reliable open-source relational databases. With over 30 years of development, it offers enterprise-class performance and features that rival proprietary solutions.

What sets PostgreSQL apart is its extensibility and standards compliance. It supports advanced data types including JSON, arrays, and custom types. ACID compliance ensures data integrity, while MVCC (Multi-Version Concurrency Control) allows high concurrency without locking readers and writers.

Performance-wise, PostgreSQL excels with sophisticated query planning, parallel queries, and efficient indexing options including B-tree, hash, GiST, and GIN indexes. For modern applications, native JSON support with powerful querying capabilities makes it an excellent choice for both relational and document-based data models.

The active community continuously improves PostgreSQL, adding features like logical replication, declarative partitioning, and just-in-time compilation. Whether you're building a small application or a large-scale system, PostgreSQL provides the reliability and features you need.`,
          excerpt: 'Discovering why PostgreSQL is the preferred choice for modern applications.'
        }
      ];

      for (const article of seedArticles) {
        await client.query(
          'INSERT INTO articles (title, content, excerpt) VALUES ($1, $2, $3)',
          [article.title, article.content, article.excerpt]
        );
      }
      console.log('Initial articles seeded successfully');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { pool, initDb };
