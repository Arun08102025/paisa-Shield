CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Unified Users & Profiles (No Admin Login in public scope)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'household', 'farmer', 'community')),
  display_name TEXT,
  preferred_language TEXT DEFAULT 'en',
  budget_limit NUMERIC DEFAULT 10000,
  goal_name TEXT DEFAULT 'My Savings Goal',
  goal_target NUMERIC DEFAULT 25000,
  goal_saved NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (email, role)
);

-- 2. Income Records
CREATE TABLE IF NOT EXISTS income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  category TEXT DEFAULT 'Salary / Allowance',
  amount NUMERIC NOT NULL CHECK (amount > 0),
  date DATE DEFAULT CURRENT_DATE
);

-- 3. Verified Expenses (Only server-verified payments get a payment_id)
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  merchant TEXT NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  crop TEXT,
  payment_id TEXT UNIQUE,
  date DATE DEFAULT CURRENT_DATE
);

-- 4. Bills & Payment Orders
CREATE TABLE IF NOT EXISTS bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  payee TEXT NOT NULL,
  category TEXT NOT NULL,
  crop TEXT,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Unpaid', 'Pending', 'Paid', 'Failed')),
  gateway_order_id TEXT UNIQUE,
  gateway_payment_id TEXT UNIQUE
);

-- 5. Smart Jars (Irregular Income Allocation)
CREATE TABLE IF NOT EXISTS smart_jars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  allocated NUMERIC DEFAULT 0
);

-- 6. Peer-to-Peer SHG / Chit Pool Members
CREATE TABLE IF NOT EXISTS chit_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_name TEXT NOT NULL,
  monthly_share NUMERIC NOT NULL,
  paid_this_month BOOLEAN DEFAULT FALSE,
  payout_turn TEXT
);