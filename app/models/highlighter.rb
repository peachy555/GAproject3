class Highlighter < ApplicationRecord
  has_many :highlights
  belongs_to :project
end
