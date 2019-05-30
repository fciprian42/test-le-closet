json.array! @operators_postes do |operators_poste|
  json.extract! operators_poste, :operator_id, :poste_id
end
