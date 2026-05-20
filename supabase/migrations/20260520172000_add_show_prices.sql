-- Add show_prices column to tenant_settings, defaulting to true to not impact existing tenants
ALTER TABLE public.tenant_settings
ADD COLUMN IF NOT EXISTS show_prices boolean NOT NULL DEFAULT true;
