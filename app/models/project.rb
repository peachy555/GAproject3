class Project < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :pages
  has_many :highlighters
  has_many :highlights, through: [:highlighters, :pages]
  has_many :notes, through: :highlights
end
