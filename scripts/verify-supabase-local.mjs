import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('--- Phase 1.0 Supabase Local Verification ---');

function checkDependency(command) {
    try {
        execSync(command, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

const hasSupabase = checkDependency('supabase --version');
const hasDocker = checkDependency('docker info');

if (!hasSupabase || !hasDocker) {
    console.warn('\n[YELLOW] Missing dependencies.');
    console.warn(`Supabase CLI available: ${hasSupabase}`);
    console.warn(`Docker available: ${hasDocker}`);
    console.warn('Skipping local verification. SQL scripts have been created and remain as review deliverables.');
    process.exit(0);
}

console.log('Dependencies found. Starting local Supabase...');

try {
    // start supabase
    execSync('supabase start', { stdio: 'inherit' });
    
    // reset db (applies migrations)
    console.log('Resetting database...');
    execSync('supabase db reset', { stdio: 'inherit' });

    // run smoke sql
    console.log('Running RLS smoke tests...');
    const sqlPath = path.join(process.cwd(), 'docs', 'sql', 'rls-smoke', 'phase-1-0-rls-smoke.sql');
    if (!fs.existsSync(sqlPath)) {
        throw new Error('Smoke SQL file not found: ' + sqlPath);
    }

    const command = `supabase db psql -f "${sqlPath}"`;
    execSync(command, { stdio: 'inherit' });
    
    console.log('\n[GREEN] Local RLS Smoke Verification Passed.');
} catch (error) {
    console.error('\n[RED] Verification failed.');
    console.error(error.message);
    process.exit(1);
}
