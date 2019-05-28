class CreateOperatorsPostes < ActiveRecord::Migration[5.2]
  def change
    create_table :operators_postes do |t|
      t.references :operator, foreign_key: true
      t.references :poste, foreign_key: true

      t.timestamps
    end
  end
end
