require_relative '../model/bill'

class BillsExporter
  attr_reader :filename, :headers

  def initialize(filename: nil)
    @filename = filename || 'bills.csv'
    @headers = %w[id title supporter_count opposer_count primary_sponsor]
  end

  def execute
    CSV.open(filename, 'wb', write_headers: true, headers: headers) do |csv|
      Bill.all.each { |bill| csv << convert_to_row(bill) }
    end
  end

  private

  def convert_to_row(bill)
    [bill.id, bill.title, bill.supports.size, bill.oppositions.size, bill.primary_sponsor]
  end
end

BillsExporter.new.execute