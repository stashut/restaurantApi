using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace restaurantApi.Models
{
    public class OrderMaster
    {
        [Key] 
        public long OrderMasterId { get; set; }
        
        [Column(TypeName = "nvarchar(75)")]
        public string OrderNumber { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string PaymentMethod { get; set; }

        public decimal GrandTotal { get; set; }
        
    }
}