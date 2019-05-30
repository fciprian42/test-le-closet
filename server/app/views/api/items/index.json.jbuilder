json.array! @items do |item|
  json.extract! item, :product_id
end