class Highlight < ApplicationRecord
  belongs_to :highlighter
  belongs_to :page
  has_many :notes
end
