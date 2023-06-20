require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"
require 'dotenv/load'
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)


module Untitled
  class Application < Rails::Application
    # ...
    config.middleware.use ActionDispatch::Cookies
    config.railties_order = [:all, :main_app]
    config.middleware.use ActionDispatch::Session::CookieStore,
      key: '_auth_me_session',
      same_site: :lax, 
      secure: Rails.env.production?
    # Cloudinary configuration
    config.cloudinary = config_for(:cloudinary)
  end
end