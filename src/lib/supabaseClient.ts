import { createClient } from '@supabase/supabase-js';

// Ganti teks di dalam tanda kutip dengan URL dan Anon Key dari dashboard Supabase Anda
const supabaseUrl = 'https://eqlobeftecuriotadavh.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbG9iZWZ0ZWN1cmlvdGFkYXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDIzNzgsImV4cCI6MjA5NTIxODM3OH0.lEKPQ2kft-dPjsD5xRBXp-k2k3BmHxIxT68fby9fTZg'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);