require_relative 'application_model'
require_relative 'vote_result'

class Legislator < ApplicationModel
  attr_reader :id, :name

  def self.filename
    'legislators'
  end

  def self.all
    read.map { |row| new(row[:id], row[:name]) }
  end

  def initialize(id, name)
    @id = id
    @name = name
  end

  def votes
    @votes ||= VoteResult.all.select { |vote_result| vote_result.legislator_id == id }
  end

  def supported_bills
    votes.select { |vote| vote.vote_type == 1 }
  end

  def opposed_bills
    votes.select { |vote| vote.vote_type == 2 }
  end
end