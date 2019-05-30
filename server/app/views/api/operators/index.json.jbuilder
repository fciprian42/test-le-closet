json.array! @operators do |operator|
  json.extract! operator, :id, :name, :score
end
