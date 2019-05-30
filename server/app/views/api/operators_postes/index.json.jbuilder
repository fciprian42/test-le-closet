json.array! @operatorsPostes do |operatorsPoste|
  json.extract! operatorsPoste, :operator_id, :poste_id
end
