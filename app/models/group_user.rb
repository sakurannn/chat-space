class GroupUser < ApplicationRecord
  belongs_to :group
  belpngs_to :user
end
