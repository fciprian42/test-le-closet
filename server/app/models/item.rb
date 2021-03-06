class Item < ApplicationRecord
  belongs_to :product

  validates :product, presence: true

  def to_builder
        Jbuilder.new do |item|
          item.(self, :id, :id_product, :product_name, :by, :checked)
        end
      end
end
