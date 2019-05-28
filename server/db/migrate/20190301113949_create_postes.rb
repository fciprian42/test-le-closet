class CreatePostes < ActiveRecord::Migration[5.2]
  def change
    create_table :postes do |t|
      t.integer :category

      t.timestamps
    end
  end
end
