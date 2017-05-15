class Page < ApplicationRecord
  belongs_to :project
  has_many :highlights
  has_many :notes, through: :highlights
end
