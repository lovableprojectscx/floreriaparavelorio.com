export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
          tenant_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
          tenant_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "categories_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          category: string[] | null;
          created_at: string | null;
          description: string | null;
          id: string;
          image: string | null;
          offer_price: number | null;
          price: number;
          rating: number | null;
          stock: string | null;
          tenant_id: string;
          title: string;
        };
        Insert: {
          category?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          offer_price?: number | null;
          price: number;
          rating?: number | null;
          stock?: string | null;
          tenant_id: string;
          title: string;
        };
        Update: {
          category?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          offer_price?: number | null;
          price?: number;
          rating?: number | null;
          stock?: string | null;
          tenant_id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      reservations: {
        Row: {
          address: string | null;
          created_at: string;
          date: string;
          dedication: string | null;
          delivery_date: string | null;
          delivery_fee: number | null;
          district: string | null;
          for_name: string | null;
          from_name: string | null;
          id: string;
          items: Json | null;
          message: string | null;
          name: string;
          payment_method: string | null;
          phone: string;
          receipt_url: string | null;
          receiver_phone: string | null;
          reference: string | null;
          status: string;
          tenant_id: string;
          time_slot: string | null;
          total: number | null;
          tracking_code: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          date: string;
          dedication?: string | null;
          delivery_date?: string | null;
          delivery_fee?: number | null;
          district?: string | null;
          for_name?: string | null;
          from_name?: string | null;
          id?: string;
          items?: Json | null;
          message?: string | null;
          name: string;
          payment_method?: string | null;
          phone: string;
          receipt_url?: string | null;
          receiver_phone?: string | null;
          reference?: string | null;
          status?: string;
          tenant_id: string;
          time_slot?: string | null;
          total?: number | null;
          tracking_code?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          date?: string;
          dedication?: string | null;
          delivery_date?: string | null;
          delivery_fee?: number | null;
          district?: string | null;
          for_name?: string | null;
          from_name?: string | null;
          id?: string;
          items?: Json | null;
          message?: string | null;
          name?: string;
          payment_method?: string | null;
          phone?: string;
          receipt_url?: string | null;
          receiver_phone?: string | null;
          reference?: string | null;
          status?: string;
          tenant_id?: string;
          time_slot?: string | null;
          total?: number | null;
          tracking_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenant_settings: {
        Row: {
          ad_active: boolean | null;
          ad_image_url: string | null;
          ad_link: string | null;
          ad_message: string | null;
          bcp_account: string | null;
          plin_enabled: boolean | null;
          schedule: string | null;
          show_prices: boolean;
          store_name: string | null;
          tenant_id: string;
          updated_at: string;
          whatsapp: string | null;
          yape_holder_name: string | null;
          yape_number: string | null;
          yape_qr_url: string | null;
          zones: string | null;
        };
        Insert: {
          ad_active?: boolean | null;
          ad_image_url?: string | null;
          ad_link?: string | null;
          ad_message?: string | null;
          bcp_account?: string | null;
          plin_enabled?: boolean | null;
          schedule?: string | null;
          show_prices?: boolean;
          store_name?: string | null;
          tenant_id: string;
          updated_at?: string;
          whatsapp?: string | null;
          yape_holder_name?: string | null;
          yape_number?: string | null;
          yape_qr_url?: string | null;
          zones?: string | null;
        };
        Update: {
          ad_active?: boolean | null;
          ad_image_url?: string | null;
          ad_link?: string | null;
          ad_message?: string | null;
          bcp_account?: string | null;
          plin_enabled?: boolean | null;
          schedule?: string | null;
          show_prices?: boolean;
          store_name?: string | null;
          tenant_id?: string;
          updated_at?: string;
          whatsapp?: string | null;
          yape_holder_name?: string | null;
          yape_number?: string | null;
          yape_qr_url?: string | null;
          zones?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_settings_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: true;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenant_users: {
        Row: {
          id: string;
          role: string | null;
          tenant_id: string | null;
          user_id: string;
        };
        Insert: {
          id?: string;
          role?: string | null;
          tenant_id?: string | null;
          user_id: string;
        };
        Update: {
          id?: string;
          role?: string | null;
          tenant_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_users_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenants: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
