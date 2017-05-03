class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :email
  # validates :email, format: {
  #   with: /\A.*@.*[.].*\z/,
  #   message: "invalid email address"
  # }

  has_and_belongs_to_many :projects

end
