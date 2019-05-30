module Api
  class OperatorsPosteController < ApplicationController
    def index
        @operators_postes = OperatorsPoste.All
    end
  end
end
