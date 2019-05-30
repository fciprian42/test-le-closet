Item.destroy_all
Product.destroy_all
OperatorsPostes.destroy_all
Operator.destroy_all
Poste.destroy_all

Poste.categories.keys.each { |cat| Poste.create!(category: cat) }

Operator.create!([
  { first_name: "Hubert", last_name: "Bonisseur De La Bath", score: 0 },
  { first_name: "Noël", last_name: "Flantier", score: 0 },
  { first_name: "Jack", last_name: "Jefferson", score: 0 },
  { first_name: "Von", last_name: "Zimmel", score: 0 },
  { first_name: "Larmina", last_name: "Betouche", score: 0 }
])

Product.create!([
  { name: "Robe rouge" },
  { name: "Robe jaune" },
  { name: "Robe bleue" },
  { name: "Robe verte" }
])
