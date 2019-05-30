class OperatorsPostes < ApplicationRecord
  belongs_to :poste
  belongs_to :operator

  def to_builder
        Jbuilder.new do |operatorsPostes|
          operatorPostes.(self, :operator_id, :poste_id)
        end
      end
end
