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

ActiveRecord::Schema[7.0].define(version: 2023_04_02_020440) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_visited_at"
    t.index ["channel_id"], name: "index_channel_subscriptions_on_channel_id"
    t.index ["user_id", "channel_id"], name: "index_channel_subscriptions_on_user_id_and_channel_id", unique: true
    t.index ["user_id"], name: "index_channel_subscriptions_on_user_id"
  end

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "server_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type", default: "public", null: false
    t.boolean "is_voice", default: false, null: false
    t.index ["name"], name: "index_channels_on_name"
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "friend_requests", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_friend_requests_on_receiver_id"
    t.index ["sender_id"], name: "index_friend_requests_on_sender_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "text", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "messageable_type"
    t.bigint "messageable_id"
    t.bigint "parent_message_id"
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["messageable_type", "messageable_id"], name: "index_messages_on_messageable"
    t.index ["parent_message_id"], name: "index_messages_on_parent_message_id"
    t.index ["text"], name: "index_messages_on_text"
  end

  create_table "server_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_server_subscriptions_on_server_id"
    t.index ["user_id", "server_id"], name: "index_server_subscriptions_on_user_id_and_server_id", unique: true
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
    t.index ["username", "tag"], name: "index_users_on_username_and_tag", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "channel_subscriptions", "channels"
  add_foreign_key "channel_subscriptions", "users"
  add_foreign_key "channels", "servers"
  add_foreign_key "friend_requests", "users", column: "receiver_id"
  add_foreign_key "friend_requests", "users", column: "sender_id"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "server_subscriptions", "servers"
  add_foreign_key "server_subscriptions", "users"
  add_foreign_key "servers", "users", column: "owner_id"
end
