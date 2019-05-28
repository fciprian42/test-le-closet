json.array! @postes do |poste|
  json.extract! poste, :id, :category
end
