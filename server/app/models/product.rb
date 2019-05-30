class Product < ApplicationRecord
  has_many :items, dependent: :destroy

  def to_builder
      Jbuilder.new do |product|
        product.(self, :id, :name)
      end
    end
end
