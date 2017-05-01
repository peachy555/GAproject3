class Highlight < ApplicationRecord
  belongs_to: highlighter
  has_many: notes
end
