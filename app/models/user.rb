class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :email

  has_and_belongs_to_many :projects

end
