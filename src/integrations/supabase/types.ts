export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          email: string
          id: string
          is_primary: boolean
          name: string
          phone: string
          position: string | null
          vendor_id: string
        }
        Insert: {
          email: string
          id?: string
          is_primary?: boolean
          name: string
          phone: string
          position?: string | null
          vendor_id: string
        }
        Update: {
          email?: string
          id?: string
          is_primary?: boolean
          name?: string
          phone?: string
          position?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      job_requirements: {
        Row: {
          assigned_resources: Json | null
          budget: number | null
          client: string
          created_at: string
          deadline: string | null
          description: string
          end_date: string | null
          experience: number
          id: string
          job_id: string
          location: string
          notes: string | null
          priority: string
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          start_date: string | null
          status: string
          tech_stack: Json
          title: string
          updated_at: string
          vendor: string | null
        }
        Insert: {
          assigned_resources?: Json | null
          budget?: number | null
          client: string
          created_at?: string
          deadline?: string | null
          description: string
          end_date?: string | null
          experience?: number
          id?: string
          job_id: string
          location: string
          notes?: string | null
          priority: string
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          start_date?: string | null
          status: string
          tech_stack?: Json
          title: string
          updated_at?: string
          vendor?: string | null
        }
        Update: {
          assigned_resources?: Json | null
          budget?: number | null
          client?: string
          created_at?: string
          deadline?: string | null
          description?: string
          end_date?: string | null
          experience?: number
          id?: string
          job_id?: string
          location?: string
          notes?: string | null
          priority?: string
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          start_date?: string | null
          status?: string
          tech_stack?: Json
          title?: string
          updated_at?: string
          vendor?: string | null
        }
        Relationships: []
      }
      process_flow_history: {
        Row: {
          completed_date: string | null
          duration: number | null
          entered_date: string
          id: string
          notes: string | null
          process_flow_id: string
          stage_id: string
          stage_name: string
          updated_by: string
        }
        Insert: {
          completed_date?: string | null
          duration?: number | null
          entered_date: string
          id?: string
          notes?: string | null
          process_flow_id: string
          stage_id: string
          stage_name: string
          updated_by: string
        }
        Update: {
          completed_date?: string | null
          duration?: number | null
          entered_date?: string
          id?: string
          notes?: string | null
          process_flow_id?: string
          stage_id?: string
          stage_name?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_flow_history_process_flow_id_fkey"
            columns: ["process_flow_id"]
            isOneToOne: false
            referencedRelation: "process_flows"
            referencedColumns: ["id"]
          },
        ]
      }
      process_flows: {
        Row: {
          candidate_name: string
          created_at: string
          current_stage: string
          expected_completion_date: string | null
          id: string
          job_requirement_id: string
          notes: string | null
          priority: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          candidate_name: string
          created_at?: string
          current_stage: string
          expected_completion_date?: string | null
          id?: string
          job_requirement_id: string
          notes?: string | null
          priority: string
          start_date: string
          status: string
          updated_at?: string
        }
        Update: {
          candidate_name?: string
          created_at?: string
          current_stage?: string
          expected_completion_date?: string | null
          id?: string
          job_requirement_id?: string
          notes?: string | null
          priority?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_flows_job_requirement_id_fkey"
            columns: ["job_requirement_id"]
            isOneToOne: false
            referencedRelation: "job_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          availability: string
          contact: string
          created_at: string
          experience: number | null
          hourly_rate: number | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          resume_url: string | null
          tech_stack: Json
          type: string
        }
        Insert: {
          availability: string
          contact: string
          created_at?: string
          experience?: number | null
          hourly_rate?: number | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          tech_stack?: Json
          type: string
        }
        Update: {
          availability?: string
          contact?: string
          created_at?: string
          experience?: number | null
          hourly_rate?: number | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          tech_stack?: Json
          type?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          company: string
          created_at: string
          id: string
          industry: string | null
          name: string
          notes: string | null
          status: string
        }
        Insert: {
          company: string
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          notes?: string | null
          status: string
        }
        Update: {
          company?: string
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          notes?: string | null
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
