json.array! @items do |item|
  json.extract! item, :id, :product_id, :product_name, :by, :checked
end