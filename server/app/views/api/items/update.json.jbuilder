json.array! @items do |item|
  json.extract! item, :checked, :id
end