class Page < ApplicationRecord
  belongs_to :project
  has_many :highlights
end
