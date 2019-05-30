class Operator < ApplicationRecord
  has_many :operators_postes, dependent: :destroy
  has_many :postes, through: :operators_postes

  validates :first_name, :last_name, :score, presence: true

  def name
    "#{first_name} #{last_name}"
  end

  def to_builder
    Jbuilder.new do |operator|
      operator.(self, :id, :name, :score)
    end
  end

  def update
    "#{score}"
  end
end
