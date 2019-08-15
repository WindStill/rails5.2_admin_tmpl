class CreateAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :admins do |t|
      t.string :username,   limit: 191,   index: {unique: true}
      t.string :email,      limit: 191,   index: {unique: true}
      t.string :nickname
      t.string :password_digest
      t.string :remember_token

      t.timestamps
    end
  end
end
