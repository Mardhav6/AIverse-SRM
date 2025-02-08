/*
  # Initial Schema for SRM Campus Website

  1. New Tables
    - `users`
      - Managed by Supabase Auth
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (timestamptz)
      - `location` (text)
      - `created_at` (timestamptz)
    - `hostel_menu`
      - `id` (uuid, primary key)
      - `day` (text)
      - `meal_type` (text)
      - `items` (text[])
      - `created_at` (timestamptz)
    - `campus_locations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `coordinates` (point)
      - `category` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  location text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON events
  FOR SELECT
  USING (true);

CREATE POLICY "Events are insertable by authenticated users"
  ON events
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Hostel Menu Table
CREATE TABLE IF NOT EXISTS hostel_menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL,
  meal_type text NOT NULL,
  items text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hostel_menu ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hostel menu is viewable by everyone"
  ON hostel_menu
  FOR SELECT
  USING (true);

CREATE POLICY "Hostel menu is insertable by authenticated users"
  ON hostel_menu
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Campus Locations Table
CREATE TABLE IF NOT EXISTS campus_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  coordinates point,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE campus_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Campus locations are viewable by everyone"
  ON campus_locations
  FOR SELECT
  USING (true);

CREATE POLICY "Campus locations are insertable by authenticated users"
  ON campus_locations
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');