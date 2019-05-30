class OperatorsPostes < ApplicationRecord
  belongs_to :poste, :operator

  validates :product, :operator, presence: true

  def to_builder
        Jbuilder.new do |operatorsPostes|
          operatorPostes.(self, :operator_id, :poste_id)
        end
      end
end
