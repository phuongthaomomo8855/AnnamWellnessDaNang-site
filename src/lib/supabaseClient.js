import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qbihqjrkwuwvcudlfscw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaWhxanJrd3V3dmN1ZGxmc2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTg1ODksImV4cCI6MjA2Mjk5NDU4OX0.0BIYqDq-IwxkEPbchsnXeaU5IDSmAZZ5Nv65QpWreaI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);