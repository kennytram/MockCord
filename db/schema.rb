# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_01_114949) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "server_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_channels_on_name"
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "direct_messages", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "other_user_id"
    t.index ["other_user_id"], name: "index_direct_messages_on_other_user_id"
    t.index ["user_id"], name: "index_direct_messages_on_user_id"
  end

  create_table "dm_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "direct_message_id"
    t.index ["direct_message_id"], name: "index_dm_subscriptions_on_direct_message_id"
    t.index ["user_id"], name: "index_dm_subscriptions_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "text", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "messageable_type"
    t.bigint "messageable_id"
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["messageable_type", "messageable_id"], name: "index_messages_on_messageable"
    t.index ["text"], name: "index_messages_on_text"
  end

  create_table "server_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_server_subscriptions_on_server_id"
    t.index ["user_id"], name: "index_server_subscriptions_on_user_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_servers_on_name"
    t.index ["owner_id"], name: "index_servers_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.string "tag"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "channels", "servers"
  add_foreign_key "direct_messages", "users", column: "other_user_id"
  add_foreign_key "dm_subscriptions", "users"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "server_subscriptions", "servers"
  add_foreign_key "server_subscriptions", "users"
  add_foreign_key "servers", "users", column: "owner_id"
end
