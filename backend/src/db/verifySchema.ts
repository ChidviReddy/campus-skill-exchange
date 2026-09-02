import pool from "../config/db";

async function verifySchema(): Promise<void> {
  console.log("\n============================================================");
  console.log("       SKILLSWAP POSTGRESQL SCHEMA VERIFICATION");
  console.log("============================================================\n");

  // 1. Tables & Column Count
  const tables = await pool.query<{ table_name: string }>(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);

  console.log(`📋 Total Public Tables: ${tables.rows.length}`);
  for (const row of tables.rows) {
    const cols = await pool.query<{ count: string }>(
      `SELECT count(*) as count FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1`,
      [row.table_name]
    );
    console.log(`   - ${row.table_name.padEnd(25)} (${cols.rows[0].count} columns)`);
  }

  // 2. Primary Keys
  const pks = await pool.query<{ table_name: string; column_name: string }>(`
    SELECT kcu.table_name, kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.constraint_type = 'PRIMARY KEY' AND tc.table_schema = 'public'
    ORDER BY kcu.table_name;
  `);
  console.log(`\n🔑 Primary Keys: ${pks.rows.length}`);
  pks.rows.forEach((pk) => {
    console.log(`   - ${pk.table_name}.${pk.column_name}`);
  });

  // 3. Foreign Keys
  const fks = await pool.query<{
    table_name: string;
    column_name: string;
    foreign_table_name: string;
    foreign_column_name: string;
  }>(`
    SELECT
      tc.table_name, 
      kcu.column_name, 
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name 
    FROM information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
    ORDER BY tc.table_name, kcu.column_name;
  `);
  console.log(`\n🔗 Foreign Keys: ${fks.rows.length}`);
  fks.rows.forEach((fk) => {
    console.log(`   - ${fk.table_name}.${fk.column_name} -> ${fk.foreign_table_name}.${fk.foreign_column_name}`);
  });

  // 4. Unique Constraints
  const uqs = await pool.query<{ table_name: string; constraint_name: string }>(`
    SELECT DISTINCT table_name, constraint_name
    FROM information_schema.table_constraints
    WHERE constraint_type = 'UNIQUE' AND table_schema = 'public'
    ORDER BY table_name;
  `);
  console.log(`\n🔒 Unique Constraints: ${uqs.rows.length}`);
  uqs.rows.forEach((uq) => {
    console.log(`   - ${uq.table_name} (${uq.constraint_name})`);
  });

  // 5. Indexes
  const idxs = await pool.query<{ tablename: string; indexname: string }>(`
    SELECT tablename, indexname 
    FROM pg_indexes 
    WHERE schemaname = 'public'
    ORDER BY tablename, indexname;
  `);
  console.log(`\n⚡ Indexes: ${idxs.rows.length}`);
  idxs.rows.forEach((idx) => {
    console.log(`   - ${idx.tablename}: ${idx.indexname}`);
  });

  console.log("\n============================================================");
  console.log("       ALL SCHEMA CHECKS COMPLETED SUCCESSFULLY");
  console.log("============================================================\n");
}

verifySchema()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error("Verification error:", err);
    await pool.end();
    process.exit(1);
  });
