export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'artist' | 'promoter' | 'venue';
          display_name: string;
          slug: string;
          bio: string | null;
          location_city: string | null;
          location_country: string | null;
          profile_photo: string | null;
          social_links: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      artists: {
        Row: {
          id: string;
          profile_id: string;
          genres: string[];
          experience_level: string;
          gender_identity: string | null;
          fee_minimum: number;
          fee_currency: string;
          fee_negotiable: boolean;
          equipment: Json;
          hardware_requirements: string | null;
          embeds: Json;
          photo_gallery: Json;
          available_tonight: boolean;
          available_tonight_until: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['artists']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['artists']['Insert']>;
      };
      touring_windows: {
        Row: {
          id: string;
          artist_id: string;
          city: string;
          country: string;
          lat: number | null;
          lng: number | null;
          date_from: string;
          date_to: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['touring_windows']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['touring_windows']['Insert']>;
      };
      promoters: {
        Row: {
          id: string;
          profile_id: string;
          trusted_partner: boolean;
          total_events_hosted: number;
          preferred_genres: string[];
          preferred_locations: string[];
          preferred_gender_identities: string[];
          preferred_experience_levels: string[];
          past_events_gallery: Json;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['promoters']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['promoters']['Insert']>;
      };
      venues: {
        Row: {
          id: string;
          profile_id: string;
          capacity: number | null;
          venue_fee: number | null;
          fee_currency: string;
          tech_specs: Json;
          load_in_info: Json;
          operational_photos: Json;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['venues']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['venues']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          promoter_id: string;
          venue_id: string | null;
          title: string;
          slug: string;
          date: string;
          genres: string[];
          status: 'Open' | 'Confirmed' | 'Cancelled' | 'Completed';
          blind_applications: boolean;
          emergency: boolean;
          emergency_triggered_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      slots: {
        Row: {
          id: string;
          event_id: string;
          slot_type: 'Opening' | 'Peak Time' | 'Closing' | 'B2B';
          start_time: string;
          end_time: string;
          fee: number;
          currency: string;
          genres: string[];
          status: 'Open' | 'Filled' | 'Cancelled';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['slots']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['slots']['Insert']>;
      };
      applications: {
        Row: {
          id: string;
          slot_id: string;
          event_id: string;
          artist_id: string;
          cover_note: string | null;
          mix_url: string | null;
          match_score: number;
          status: 'Pending' | 'Shortlisted' | 'Confirmed' | 'Rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };
      fee_negotiations: {
        Row: {
          id: string;
          application_id: string;
          proposed_by: string;
          amount: number;
          currency: string;
          note: string | null;
          status: 'Pending' | 'Accepted' | 'Countered' | 'Rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['fee_negotiations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['fee_negotiations']['Insert']>;
      };
      contracts: {
        Row: {
          id: string;
          event_id: string;
          slot_id: string;
          artist_id: string;
          promoter_id: string;
          agreed_fee: number;
          currency: string;
          contract_text: string;
          artist_signed_at: string | null;
          promoter_signed_at: string | null;
          artist_signed_name: string | null;
          promoter_signed_name: string | null;
          status: 'Draft' | 'Sent' | 'SignedByArtist' | 'SignedByBoth' | 'Disputed' | 'Cancelled';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contracts']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['contracts']['Insert']>;
      };
      payment_instalments: {
        Row: {
          id: string;
          contract_id: string;
          label: string;
          amount: number;
          currency: string;
          due_date: string;
          paid: boolean;
          paid_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['payment_instalments']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['payment_instalments']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      conversations: {
        Row: {
          id: string;
          participant_a: string;
          participant_b: string;
          last_message_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
      };
      emergency_responses: {
        Row: {
          id: string;
          event_id: string;
          slot_id: string;
          artist_id: string;
          premium_fee: number;
          status: 'Pending' | 'Accepted' | 'Expired';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['emergency_responses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['emergency_responses']['Insert']>;
      };
      vouch_badges: {
        Row: {
          id: string;
          artist_id: string;
          promoter_id: string;
          badge: string;
          event_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['vouch_badges']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['vouch_badges']['Insert']>;
      };
      djs_dj_nominations: {
        Row: {
          id: string;
          nominator_id: string;
          nominee_id: string;
          month: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['djs_dj_nominations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['djs_dj_nominations']['Insert']>;
      };
      team_members: {
        Row: {
          id: string;
          profile_id: string;
          team_owner_id: string;
          role: 'owner' | 'booker' | 'admin' | 'manager';
          invited_email: string;
          accepted: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>;
      };
    };
  };
}
