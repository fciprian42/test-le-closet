module Api
  class OperatorsController < ApplicationController
    def index
      sleep 1 # Simulate loading time
      @operators = Operator.all
    end
  end
end
