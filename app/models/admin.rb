class Admin < ApplicationRecord
  has_secure_password

  validates :password, length: { in: 6..20 }, allow_nil: true
  validates :username, :email, presence: true, uniqueness: true


  def self.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def self.encrypt(token)
    Digest::SHA1.hexdigest(token.to_s)
  end
end
